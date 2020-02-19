//@ts-ignore
import {ModuleModel} from 'mcf-module';
import 'reflect-metadata';
import pk, {fk} from 'redux-orm';
const {attr, BaseModel} = ModuleModel;
export const namespace = 'test';

function Model(target: any) {
  //@ts-ignore
  return (aa: any) => {
    // console.log(target.constructor.prototype);
    // console.log(Reflect.getMetadataKeys(target), aa);
    var dataKeys = Reflect.getMetadataKeys(target);
    dataKeys.map(it => {
      const {method, ...settings} = Reflect.getMetadata(it, target);
      target.fields = Object.assign({}, BaseModel.fields, {
        [it]: method(settings)
      });
    });
  };
}

let fieldSetAttr = (settings: any) =>
  function(target: any, propertyKey: string) {
    // console.log(target.constructor, propertyKey, obj);

    Reflect.defineMetadata(
      propertyKey,
      {...settings, method: attr},
      target.constructor
    );
    // console.log(Reflect.getMetadataKeys(target.constructor), target);
  };

let fieldSetPk = (settings: any) =>
  function(target: any, propertyKey: string) {
    Reflect.defineMetadata(
      propertyKey,
      {...settings, method: pk},
      target.constructor
    );
  };
let fieldSetFk = (settings: any) =>
  function(target: any, propertyKey: string) {
    Reflect.defineMetadata(
      propertyKey,
      {...settings, method: fk},
      target.constructor
    );
  };

@Model(BaseModels)
export default class BaseModels extends BaseModel {
  static modelName = namespace;
  static fields = {};
  static options = {
    idAttribute: 'id'
  };
  // @pk({idAttribute: 'departmentId'})
  // @Reflect.metadata('name', 'hello')
  @fieldSetAttr({fieldName: 'id', to: 'aa'})
  id!: string;

  @fieldSetAttr({fieldName: 'parentId', get: () => {}})
  departmentId!: string;
}
//@ts-ignore
// console.log(Reflect.getMetadata(''));

// let fieldSet = (obj: any) =>
//   function(target: any, propertyKey: string) {
//     console.log(target, propertyKey, obj);

//     Reflect.defineMetadata(propertyKey, obj, target);

//     console.log(
//       Reflect.getMetadata('msg', target),
//       Reflect.getMetadataKeys(target)
//     );
//     // 获取成员类型
//     // let type = Reflect.getMetadata('design:type', target, propertyKey);
//     // // 获取成员参数类型
//     // let paramtypes = Reflect.getMetadata(
//     //   'design:paramtypes',
//     //   target,
//     //   propertyKey
//     // );
//     // // 获取成员返回类型
//     // let returntype = Reflect.getMetadata(
//     //   'design:returntype',
//     //   target,
//     //   propertyKey
//     // );
//     // // 获取所有元数据 key (由 TypeScript 注入)
//     // let keys = Reflect.getMetadataKeys(target, propertyKey);

//     // console.log(keys); // [ 'design:returntype', 'design:paramtypes', 'design:type' ]
//     // // 成员类型
//     // console.log(type); // Function
//     // // 参数类型
//     // console.log(paramtypes); // [String]
//     // // 成员返回类型
//     // console.log(returntype); // String
//     }
// @Model
// export default class User {
//   // 使用这个装饰器就可以反射出成员详细信息
//   @meta({aaa: 123})
//   say!: string;
// }

// function fieldSet(field: object) {
//   return (a: any, b: any) => {
//     console.log(Reflect);
//     // Reflect
//     return Reflect.getMetadata(b, field);

//     // BaseModel.fields = Object.assign({}, BaseModel.fields, {[b]: attr(field)});
//     console.log(a, b, field);
//   };
// }

// console.log(Reflect.getMetadata('id',))

// function pk(field: object) {
//   return (a: any, b: any) => {
//     BaseModel.options = field;
//   };
// }

// const formatMetadataKey = Symbol("format");

// function format(formatString: string) {
//     return Reflect.metadata(formatMetadataKey, formatString);
// }

// function getFormat(target: any, propertyKey: string) {
//     return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }

// @Reflect.metadata('role', 'admin')
// class Post {}

// const metadata = Reflect.getMetadata('role', Post);

// console.log(metadata);
