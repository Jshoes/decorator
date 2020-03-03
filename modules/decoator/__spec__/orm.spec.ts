//@ts-ignore
import {ModuleModel} from 'mcf-module';
import pk, {fk} from 'redux-orm';
import {Model, fieldSetAttr, fieldSetPk, fieldSetFk} from '../test';
import {AnyAction} from 'redux';
const {orm, attr, BaseModel} = ModuleModel;

describe('ORM initial', () => {
  @Model()
  class TestModel extends BaseModel {
    @fieldSetPk()
    id!: String;
    @fieldSetAttr()
    serverName!: String;

    @fieldSetAttr()
    serverStatus!: String;

    @fieldSetAttr()
    serverIp!: String;
    @fieldSetAttr()
    serverPort!: String;

    serverAddress!: String;

    @fieldSetAttr('serverPort')
    port!: Number;

    prop1!: String;

    @fieldSetAttr({fieldName: 'serverStatus'})
    serverStatusStr!: String;

    get getserverName() {
      return 'unname';
    }
    get getProp1() {
      return 111;
    }
    get getServerIp() {
      //@ts-ignore
      return 'http://' + this._fields.serverIp;
    }
    get getServerAddress() {
      //@ts-ignore
      return [this._fields.serverIp, this._fields.serverPort].join(':');
    }

    get getServerStatusStr() {
      //@ts-ignore
      return this._fields.serverStatus === '1' ? '启用' : '禁用';
    }
  }
  @Model()
  class TestPropModel extends BaseModel {
    id!: String;
    props2!: String;
    Props1!: String;
  }
  orm.register(TestModel, TestPropModel);
  let session = orm.session({
    TestModel: {
      items: [],
      itemsById: {},
      meta: {}
    },
    TestPropModel: {
      items: [],
      itemsById: {},
      meta: {}
    }
  });

  const Test = session.TestModel;
  const TestProp = session.TestModel;
  var testModel = Test.create({
    id: 'abc',
    // serverName:"abd",
    serverStatus: '1',
    serverIp: '127.0.0.1',
    serverPort: '8080',
    ip: 'address'
  });

  // it.only('orm itemSelect',()=>{
  //   console.log(orm)
  //   console.log(Test.all().toModelArray())
  // })
  // console.log(Test.reducer.toString());
  xit('testModel constructor', done => {
    // console.log(Test)
    const obj = {
      id: 'aaa',
      serverName: 'abd',
      serverStatus: '2',
      serverIp: 'localhost',
      serverPort: '8888',
      ip: 'address'
    };
    expect(Test.parse(obj).toData()).toEqual(obj);
    expect(Test.idExists('aaa')).toEqual(false);
    //console.log(Test.all().toModelArray())
    // expect(testModel.serverName).toBe("abd")
    done();
  });

  it('testModel serverStatusStr', done => {
    expect(testModel.serverStatusStr).toBe('启用');
    done();
  });

  it('testModel  serverName default {unname}', done => {
    expect(testModel.serverName).toBe('unname');
    done();
  });

  it('testModel serverIp has value ', done => {
    expect(testModel.serverIp).toBe('http://127.0.0.1');
    done();
  });

  it('testModel port <-serverPort ', done => {
    expect(testModel.port).toBe('8080');
    done();
  });

  it('testModel serverAddress = {serverIp}:{serverPort}', done => {
    expect(testModel.serverAddress).toBe('127.0.0.1:8080');
    done();
  });
  it('testModel serverName set', done => {
    testModel.serverName = 'abc';
    let t1 = Test.all().toModelArray()[0];
    // console.log(t1['serverAddress'])
    expect(t1.serverAddress).toBe('127.0.0.1:8080');
    done();
  });

  it('testModel update column', done => {
    let t1 = Test.withId('abc');

    t1.update({
      id: 'abc',
      serverName: '变大了'
    });
    done();
    // console.log(t1.toData())
  });

  it('testModel fk', done => {
    let t1 = Test.withId('abc');
    let t2 = TestProp.create({
      id: 1,
      tableId: 'abc',
      props1: 'aa',
      props2: 'bb'
    });
    // console.log(t1,t2)

    done();
  });
});

describe('reducer test', () => {
  it('owner reducers = {}', () => {
    @Model()
    class ReducerModel extends BaseModel {
      id!: String;
      props2!: String;
      Props1!: String;
    }
    orm.register(ReducerModel);
    let session = orm.session({
      ReducerModel: {
        items: [],
        itemsById: {},
        meta: {}
      }
    });
    const ReducerTester = session.ReducerModel;
    const action = {
      type: 'test/newItem',
      payload: '123'
    };
    const modelClass = {
      create: jest.fn(),
      modelName: 'test'
    };
    expect(ReducerTester.reducer(action, modelClass, {})).toEqual(undefined);
    expect(modelClass.create).toHaveBeenCalled();
    expect(modelClass.create.mock.calls[0][0]).toEqual(action.payload);
  });

  it('change recuerJson ', () => {
    @Model()
    class ReducerChangeModel extends BaseModel {
      static reducers = {
        newItem: (action: AnyAction, modelClass: any) => {
          modelClass.abc(action);
        },
        testReducer: (action: AnyAction, modelClass: any) => {
          modelClass.efg(action);
        }
      };
      id!: String;
      props2!: String;
      Props1!: String;
    }
    orm.register(ReducerChangeModel);
    let session = orm.session({
      ReducerChangeModel: {
        items: [],
        itemsById: {},
        meta: {}
      }
    });
    const ReducerTester = session.ReducerChangeModel;
    const modelClass = {
      modelName: 'change',
      abc: jest.fn(),
      efg: jest.fn()
    };
    const action1 = {
      type: 'change/newItem',
      payload: [1, 2, 3]
    };
    const action2 = {
      type: 'change/testReducer',
      payload: 123
    };
    const sessionState = {
      state: 123
    };
    expect(ReducerTester.reducer(action1, modelClass, sessionState)).toEqual(
      sessionState.state
    );
    expect(modelClass.abc).toHaveBeenCalled();
    expect(modelClass.abc.mock.calls[0][0]).toEqual(action1);
    expect(ReducerTester.reducer(action2, modelClass, {})).toEqual(undefined);
    expect(modelClass.efg).toHaveBeenCalled();
    expect(modelClass.efg.mock.calls[0][0]).toEqual(action2);
  });
});
