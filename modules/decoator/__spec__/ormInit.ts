//@ts-ignore
import {ModuleModel} from 'mcf-module';
import pk, {fk} from 'redux-orm';
import {Model, fieldSetAttr, fieldSetPk, fieldSetFk} from '../test';
import {AnyAction} from 'redux';
const {orm, attr, BaseModel} = ModuleModel;

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

@Model()
class ReducerModel extends BaseModel {
  id!: String;
  props2!: String;
  Props1!: String;
}

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

orm.register(TestModel, TestPropModel, ReducerModel, ReducerChangeModel);
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
  },
  ReducerModel: {
    items: [],
    itemsById: {},
    meta: {}
  },
  ReducerChangeModel: {
    items: [],
    itemsById: {},
    meta: {}
  }
});

export {session};