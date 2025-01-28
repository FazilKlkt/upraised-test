const codeNames = [
    'The Nightingale',
    'The Kraken',
    'The Phoenix',
    'The Viper',
    'The Shadow',
    'The Eagle',
    'The Man',
    'The Lion',
    'The Keyboard',
    'The RTH',
    'The UFO',
    'The Creen',
    'The Phantom',
    'The Interceptor',
    'The MIA',
    'The RTR',
    'The Boss',
    'The Kid',
  ];
  
  const generateCodename = async (prisma) => {
    if (!prisma) throw new Error('Prisma instance is undefined in generateCodename');

    let codename;
    let exists = true;
    while (exists) {
      const index = Math.floor(Math.random() * codeNames.length);
      codename = codeNames[index];
      const gadget = await prisma.gadget.findUnique({ where: { codename } });
      exists = !!gadget;
    }
    return codename;
  };
  
  module.exports = generateCodename;