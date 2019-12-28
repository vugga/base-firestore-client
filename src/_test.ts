import { expect } from 'chai';
import 'mocha';
import BaseFireStore from '.';
import { db } from './_init'
import { Where } from './interface';

const sampleData = {
  name: 'name',
  unique: "unique",
  customField: 'customField',
  customFieldX: 'customFieldX'
};

const queryFields: Where[] = [
  { name: 'unique', operator: '==', value: sampleData.unique },
  { name: 'name', operator: '==', value: sampleData.name }
];

/**
 * Test collection that extends from the base firestore
 */
class BaseCollection extends BaseFireStore {
  constructor() {
    super(db,
      {
        debug: true
      });
  }
}

class TestCollection extends BaseCollection {
  constructor() {
    super();
    this.collection = 'test';
  }
}



let currentId = ""; // to be used for other tests, like delete, and  edit

describe('Given a BaseFireStore client with `test` collection', () => {

  it('should create and save document', async () => {
    const testdb = new TestCollection();
    const sampleSet = await testdb.add(sampleData);
    currentId = sampleSet && sampleSet.id; // set current Id
    // tslint:disable-next-line: no-console
    console.log('saved returned Id is', currentId);
    // tslint:disable-next-line: no-unused-expression
    expect(sampleSet.id).to.be.string;
  });

  it(`should get document by Id`, async () => {
    const testdb = new TestCollection();
    const sampleSet: { name?: string, unique?: string, id?: any } = await testdb.byId(currentId);
    const Id = sampleSet && sampleSet.id;
    // tslint:disable-next-line: no-console
    console.log('saved data is', JSON.stringify(sampleSet));
    // tslint:disable-next-line: no-unused-expression
    expect(sampleSet.id).to.be.string;
  });

  it(`should get document by 2 conditions with whereAll`, async () => {
    const testdb = new TestCollection();
    const sampleSet: { name?: string, unique?: string, id?: any } = await testdb.whereAll({
      fields: queryFields,
      multiple: false
    });
    // tslint:disable-next-line: no-console
    console.log('Where by 2 conditions saved data is', JSON.stringify(sampleSet));

    const id = sampleSet && sampleSet.id;
    expect(id).to.be.equal(currentId);
  });

  it(`should get document with whereAll and update it`, async () => {
    const testdb = new TestCollection();
    const sampleSet: { name?: string, unique?: string, id?: any } = await testdb.whereAll({
      fields: queryFields,
      multiple: false
    });
    // tslint:disable-next-line: no-console
    const id = sampleSet && sampleSet.id;

    const updateDocument = await testdb.update({
      id,
      field: 'name',
      value: 'value'
    });

    expect(updateDocument.id).to.be.equal(currentId);
  });

  it(`should delete document by Id`, async () => {
    const testdb = new TestCollection();
    const sampleSet: { name?: string, unique?: string, id?: any } = await testdb.delete(currentId);
    const Id = sampleSet && sampleSet.id;
    // tslint:disable-next-line: no-console
    console.log('deleted Id is', Id);
    // tslint:disable-next-line: no-unused-expression
    expect(Id).to.be.string;
  });

});
