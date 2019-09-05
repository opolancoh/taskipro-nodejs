const request = require('supertest');
const { expect } = require('chai');

const { apiUrl, authToken } = require('./params');

exports.run = ({ resourceSuffix, validData, invalidData }) => {
  describe(`PUT ${apiUrl}${resourceSuffix}/:id`, () => {
    let dataFromDb;

    before(async () => {
      const res = await request(apiUrl)
        .get(`${resourceSuffix}?select=_id&limit=1`)
        .set('x-auth-token', authToken);
      dataFromDb = res.body.d;
    });
    //
    describe(`should UPDATE`, () => {
      validData.forEach(element => {
        it(`Code 200: ${element.message()}`, async () => {
          const id = dataFromDb[0]._id;
          const path = `${resourceSuffix}/${id}`;
          const data = element.body;
          const res = await request(apiUrl)
            .put(path)
            .set('x-auth-token', authToken)
            .send(data);

          expect(res.status).to.equal(200);

          expect(res.body)
            .to.have.a.property('code')
            .to.be.a('number')
            .to.equal(200);

          expect(res.body)
            .to.have.a.property('d')
            .to.be.an('object');

          element.retornableFields.forEach(field => {
            expect(res.body.d)
              .to.have.a.property(field.name)
              .to.be.a(field.type);
          });
          element.nonRetornableFields.forEach(field => {
            expect(res.body.d).to.not.have.a.property(field.name);
          });
          // check for properties and values
          Object.keys(data).forEach(key => {
            const value = data[key];
            if (typeof value !== 'object') {
              expect(res.body.d).to.have.a.property(key, value);
            } else {
              const obj = {};
              obj[key] = value;
              expect(res.body.d).to.deep.include(obj);
            }
          });
        });
      });
    });
    //
    describe(`should not UPDATE`, () => {
      invalidData.forEach(element => {
        it(`Code ${element.code}: ${element.message()}`, async () => {
          const id = element.id ? element.id : dataFromDb[0]._id;
          const data = element.body;
          const res = await request(apiUrl)
            .put(`${resourceSuffix}/${id}`)
            .set('x-auth-token', authToken)
            .send(data);

          expect(res.status).to.equal(200);
          expect(res.body)
            .to.have.a.property('code')
            .to.be.a('number')
            .to.equal(element.code);

          expect(res.body)
            .to.have.a.property('message')
            .to.be.a('string');
          expect(res.body)
            .to.have.a.property('errors')
            .to.be.an('object');
        });
      });
    });
  });
};
