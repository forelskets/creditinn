import faker from 'faker';

// ----------------------------------------------------------------------

const bank = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  company: faker.company.companyName()
}));

export default bank;
