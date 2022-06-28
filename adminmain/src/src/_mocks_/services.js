import faker from 'faker';

// ----------------------------------------------------------------------

const services = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  company: faker.company.companyName()
}));

export default services;
