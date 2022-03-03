import faker from 'faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const offer = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  company: faker.company.companyName(),
  status: sample(['active', 'banned'])
}));

export default offer;
