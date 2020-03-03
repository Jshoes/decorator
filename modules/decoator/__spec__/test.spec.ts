//@ts-ignore
// import {ModuleModel} from 'mcf-module';
// import {Model, fieldSetAttr, fieldSetPk, fieldSetFk} from '../test';
// const {attr, BaseModel} = ModuleModel;

// describe.skip('test', () => {
//   @Model()
//   class BaseModels extends BaseModel {
//     // @fieldSetPk()
//     @fieldSetAttr()
//     id!: string;

//     // @fieldSetFk({to: 'assetsdir', relatedName: 'children'})
//     @fieldSetAttr()
//     departmentName!: string;

//     @fieldSetAttr({fieldName: 'parentId', get: (val: any) => val})
//     departmentId!: string;

//     get getdepartmentId() {
//       return this.departmentId;
//     }
//     set getdepartmentId(val: any) {
//       this.departmentId = val;
//     }
//   }
//   it('base', () => {
//     // expect(new BaseModels({})).toEqual({_fields: {}});
//   });

//   it('id pk define', () => {
//     // expect(BaseModels.fields.id.fieldName).toBe('id');
//     // expect(BaseModels.fields.id.opts.to).toBe('aa');
//     // expect(BaseModels.options.idAttribute).toBe('id');
//   });

//   it('model define field departmentId', () => {
//     console.log(BaseModels, BaseModel.fields);
//     // BaseModels._fields.departmentId.setMethod(123);
//     // console.log(BaseModels);
//     // expect(BaseModels.fields.id).toBe('id');
//     // expect(BaseModels.fields.id.to).toEqual('aa');
//     // expect(BaseModels.fields.departmentId.fieldName).toBe('parentId');
//     // expect(BaseModels.fields.departmentId.getMethod()).toBe(123);
//   });

//   it('model define field departmentName', () => {
//     // expect(BaseModels.fields.departmentName.toModelName).toBe('assetsdir');
//     // expect(BaseModels.fields.departmentName.relatedName).toBe('children');
//   });
// });
