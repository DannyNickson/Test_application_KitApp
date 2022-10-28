import Router from 'express';

const router = new Router();

router.post('/appointments');
router.get('/appointments');
router.get('/appointments/:id');
router.put('/appointments');
router.delete('/appointments/:id');


export default router;