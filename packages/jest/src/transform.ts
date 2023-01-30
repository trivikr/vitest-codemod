import { VitestCodemodTransform } from "@vitest-codemod/types";

export const transform: VitestCodemodTransform = {
  name: "jest",
  description: "Converts Jest APIs in a Javascript/TypeScript codebase to Vitest",
}