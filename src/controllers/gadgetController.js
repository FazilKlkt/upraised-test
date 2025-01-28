const {prisma} = require('../config/prisma');
const generateCodename = require('../utils/generateCodename');

exports.getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const gadgets = await prisma.gadget.findMany({ where });
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget,
      missionSuccessProbability: Math.floor(Math.random() * 100)
    }));
    res.json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGadget = async (req, res) => {
  try {
    const { name } = req.body;
    const codename = await generateCodename(prisma);
    const gadget = await prisma.gadget.create({
      data: { name, codename, status: 'Available' }
    });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
    if (gadget.status === 'Decommissioned') {
      return res.status(400).json({ error: 'Decommissioned gadgets cannot be updated' });
    }
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { name, status }
    });
    res.json(updatedGadget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await prisma.gadfindUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
    if (gadget.status === 'Decommissioned') {
      return res.status(400).json({ error: 'Gadget already decommissioned' });
    }
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { status: 'Decommissioned', decommissionedAt: new Date() }
    });
    res.json(updatedGadget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.selfDestructGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    await prisma.gadget.update({
      where: { id },
      data: { status: 'Destroyed' }
    });
    res.json({ confirmationCode, message: 'Self-destruct sequence initiated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};