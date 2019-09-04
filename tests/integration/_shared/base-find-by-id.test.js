const request = require('supertest');
const { expect } = require('chai');

const { apiUrl, authToken } = require('../_shared/params');

exports.run = ({ resourceSuffix, validData, invalidData }) => {
  describe(`GET ${apiUrl}${resourceSuffix}/:id`, () => {
    let dataFromDb;

    before(async () => {
      // get id from db
      const dataResult = await request(apiUrl)
        .get(`${resourceSuffix}?select=_id&limit=1`)
        .set('x-auth-token', authToken);
      dataFromDb = dataResult.body.d;
    });
    //
    describe(`should GET`, () => {
      validData.forEach(({ query, retornableFields, nonRetornableFields }) => {
        it(`Code 200: should GET a record when query is '${query}'`, async () => {
          const id = dataFromDb[0]._id;
          const path = `${resourceSuffix}/${id}`;
          const res = await request(apiUrl)
            .get(`${path}?${query}`)
            .set('x-auth-token', authToken);

          expect(res.status).to.equal(200);

          expect(res.body)
            .to.have.a.property('code')
            .to.be.a('number')
            .to.equal(200);

          expect(res.body)
            .to.have.a.property('d')
            .to.be.an('object');

          retornableFields.forEach(field => {
            expect(res.body.d)
              .to.have.a.property(field.name)
              .to.be.a(field.type);
          });
          nonRetornableFields.forEach(field => {
            expect(res.body.d).to.not.have.a.property(field.name);
          });
        });
      });
    });
    //
    describe(`should not GET`, () => {
      invalidData.forEach(element => {
        const path = `${resourceSuffix}/${element.id}`;
        it(`Code ${element.code}: ${element.message()}`, async () => {
          const res = await request(apiUrl)
            .get(`${path}`)
            .set('x-auth-token', authToken);

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
