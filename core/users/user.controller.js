const express = require('express');

const router = express.Router();

const authorize = require('../../middleware/authorize');
const requestParamsForFind = require('../../middleware/request-params-for-find');
const requestParamsForFindById = require('../../middleware/request-params-for-find-by-id');
const service = require('./user.service');

const { roles } = require('../../auth/auth.helper');

router.post('/', [authorize([roles.admin])], async (req, res) => {
  const result = await service.create(req.body);
  res.status(200).send(result);
});

router.get('/', [authorize([roles.admin]), requestParamsForFind], async (req, res) => {
  const result = await service.find(req.query.paramsForFind);
  res.status(200).send(result);
});

router.get('/:id', [authorize([roles.admin]), requestParamsForFindById], async (req, res) => {
  const result = await service.findById(req.params.id, req.query.paramsForFindById);
  res.status(200).send(result);
});

router.put('/:id', [authorize([roles.admin])], async (req, res) => {
  const result = await service.update(req.params.id, req.body);
  res.status(200).send(result);
});

router.delete('/:id', [authorize([roles.admin])], async (req, res) => {
  const result = await service.remove(req.params.id);
  res.status(200).send(result);
});

/* router.get('/me', authorize('user'), async (req, res) => {
  const result = await service.findById(req.user.id);
  res.status(200).send(result);
}); */

module.exports = router;
