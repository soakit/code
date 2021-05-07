// 新属性的对象
type ObjectWithNewProp<T, K extends string, V> = T & { [newKey in K]: V };

export class ObjectManipulator<T> {
  constructor(protected obj: T) {
    this.obj = obj;
  }

  // set方法
  // 接收任意值作为key: K
  // 返回ObjectManipulator，参数类型是
  public set<K extends string, V>(
    key: K,
    value: V
  ): ObjectManipulator<ObjectWithNewProp<T, K, V>> {
    return new ObjectManipulator({
      ...this.obj,
      [key]: value,
    } as ObjectWithNewProp<T, K, V>);
  }

  // 取T类型中的key
  public get<K extends keyof T>(key: K): T[K] {
    return this.obj[key];
  }

  // 删除T类型中的key，返回的剔除T中的K
  public delete<K extends keyof T>(key: K): ObjectManipulator<Omit<T, K>> {
    const newObj = { ...this.obj };
    delete newObj[key];
    return new ObjectManipulator(newObj);
  }

  public getObject(): T {
    return this.obj;
  }
}
