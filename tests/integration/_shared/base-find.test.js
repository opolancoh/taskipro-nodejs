const request = require('supertest');
const { expect } = require('chai');

const { apiUrl, authToken } = require('./params');

exports.run = ({ resourceSuffix, paginationData, selectData, totalCount }) => {
  describe(`GET ${apiUrl}${resourceSuffix}`, () => {
    // Pagination
    describe(`[pagination]`, () => {
      paginationData.forEach(({ query, dataLength, limit, offset }) => {
        it(`Code 200: should GET ${dataLength} records when QUERY is '${query}'`, async () => {
          const res = await request(apiUrl)
            .get(`${resourceSuffix}?${query}`)
            .set('x-auth-token', authToken);

          expect(res.status).to.equal(200);

          expect(res.body)
            .to.have.a.property('code')
            .to.be.a('number')
            .to.equal(200);

          expect(res.body)
            .to.have.a.property('meta')
            .to.be.an('object');

          expect(res.body.meta)
            .to.have.a.property('limit')
            .to.be.a('number')
            .to.equal(limit);
          expect(res.body.meta)
            .to.have.a.property('offset')
            .to.be.a('number')
            .to.equal(offset);

          expect(res.body.meta).to.not.have.a.property('totalCount');

          expect(res.body)
            .to.have.a.property('d')
            .to.be.an('array')
            .to.have.length(dataLength);
        });
      });
    });
    // TotalCount
    describe(`[pagination - total count]`, () => {
      it(`Code 200: should GET meta.totalCount when HEADER has a 'x-request-total-count' property`, async () => {
        const res = await request(apiUrl)
          .get(`${resourceSuffix}`)
          .set('x-auth-token', authToken)
          .set('x-request-total-count', 'true');

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('meta')
          .to.have.a.property('totalCount')
          .to.be.a('number')
          .to.equal(totalCount);
      });
    });
    // Select
    describe(`[select]`, () => {
      selectData.forEach(({ query, retornableFields, nonRetornableFields }) => {
        const url = `${resourceSuffix}?${query}&limit=1`;
        it(`Code 200: should GET records when QUERY is '${query}'`, async () => {
          const res = await request(apiUrl)
            .get(url)
            .set('x-auth-token', authToken);

          expect(res.status).to.equal(200);

          expect(res.body)
            .to.have.a.property('code')
            .to.be.a('number')
            .to.equal(200);
          expect(res.body)
            .to.have.a.property('d')
            .to.be.an('array');

          expect(res.body.d[0])
            .to.have.a.property('_id')
            .to.be.a('string');

          retornableFields.forEach(field => {
            expect(res.body.d[0])
              .to.have.a.property(field.name)
              .to.be.a(field.type);
          });
          nonRetornableFields.forEach(field => {
            expect(res.body.d[0]).to.not.have.a.property(field.name);
          });
        });
      });
    });
  });
};
