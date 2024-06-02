import { SVGProps } from "react";

//? type User = typeof users[0]; how to define this productive type and clean

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type TypeSafe = {
  [key: string]: any;
};

export const exclude = <TType extends TypeSafe, TKey extends keyof TType>(
  entityType: TType,
  keys: TKey[]
): Omit<TType, TKey> => {
  return Object.fromEntries(
    Object.entries(entityType).filter(([key]) => !keys.includes(key as TKey))
  ) as Omit<TType, TKey>;
};

export const excludeFromArray = <
  TType extends { [key: string]: unknown },
  TKey extends keyof TType
>(
  entityArray: TType[],
  keys: TKey[]
): Omit<TType, TKey>[] => {
  return entityArray.map((entity) => exclude(entity, keys));
};
