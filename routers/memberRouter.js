const express = require('express')
const router = express.Router()

const memberBL = require('../models/memberBL')

router.route('/')
    .get(async (req,res) =>
    {
        try {
            let members = await memberBL.getMembers()
            res.json(members)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .get(async (req,res) =>
    {
        try {
            let { params : { id } } = req;
            let member = await memberBL.getMember(id)
            res.json(member)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/')
    .post(async (req,res) =>
    {
        try {
            let { body : member } = req;
            let status = await memberBL.addMember(member);
            res.send(status)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .put(async (req,res) =>
    {
        try {
            let { body : member, params : { id } } = req;
            let status = await memberBL.updateMember(id, member)
            res.send(status)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .delete(async (req,res) =>
    {
        try {
            let { params : { id } } = req;
            let status = await memberBL.deleteMember(id)
            res.send(status)
        } catch (error) {
            res.send(error)
        }
    })

module.exports = router;