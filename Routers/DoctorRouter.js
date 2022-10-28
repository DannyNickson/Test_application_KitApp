import Router from 'express';

const router = new Router();

router.post('/doctors');
router.get('/doctors');
router.get('/doctors/:id');
router.put('/doctors');
router.delete('/doctors/:id');


export default router;