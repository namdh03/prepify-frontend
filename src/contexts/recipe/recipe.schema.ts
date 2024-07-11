import { z } from "zod";

import { RECIPE_MESSAGES } from "~utils/constants";
import { LevelCook } from "~utils/enums";

export const recipeSchema = z.object({
  name: z
    .string({
      message: RECIPE_MESSAGES.NAME_REQUIRED,
    })
    .min(1, {
      message: RECIPE_MESSAGES.NAME_REQUIRED,
    }),
  ingredients: z.array(
    z.object({
      oldId: z.string().optional(),
      ingredient_id: z.string().min(1, {
        message: RECIPE_MESSAGES.INGREDIENTS_REQUIRED,
      }),
      amount: z
        .number({
          message: RECIPE_MESSAGES.AMOUNT_REQUIRED,
        })
        .min(0, {
          message: RECIPE_MESSAGES.AMOUNT_REQUIRED,
        }),
      price: z.number(),
      unit_id: z.string({
        message: RECIPE_MESSAGES.UNIT_REQUIRED,
      }),
    }),
  ),
  deletedIngredients: z.array(z.string()),
  steps: z
    .string({
      message: RECIPE_MESSAGES.STEPS_REQUIRED,
    })
    .min(1, {
      message: RECIPE_MESSAGES.STEPS_REQUIRED,
    }),
  time: z
    .number({
      message: RECIPE_MESSAGES.TIME_REQUIRED,
    })
    .min(1, {
      message: RECIPE_MESSAGES.TIME_REQUIRED,
    }),

  level: z.string().default(LevelCook.EASY),
  nutrition: z.array(
    z.object({
      oldId: z.string().optional(),
      nutrition_id: z.string().min(1, {
        message: RECIPE_MESSAGES.NUTRITION_REQUIRED,
      }),
      amount: z
        .number({
          message: RECIPE_MESSAGES.AMOUNT_REQUIRED,
        })
        .min(0, {
          message: RECIPE_MESSAGES.AMOUNT_REQUIRED,
        }),
      unit_id: z
        .string({
          message: RECIPE_MESSAGES.UNIT_REQUIRED,
        })
        .min(1, {
          message: RECIPE_MESSAGES.UNIT_REQUIRED,
        }),
    }),
  ),
  deletedNutrition: z.array(z.string()),
  category: z
    .string({
      message: RECIPE_MESSAGES.CATEGORY_REQUIRED,
    })
    .min(1, {
      message: RECIPE_MESSAGES.CATEGORY_REQUIRED,
    }),
  images: z.array(z.instanceof(File)).optional(),
  videoUrl: z
    .string({
      message: RECIPE_MESSAGES.VIDEO_URL_REQUIRED,
    })
    .url({
      message: RECIPE_MESSAGES.VIDEO_URL_INVALID,
    }),
  foodStyleObj: z.record(
    z.string().min(1, {
      message: RECIPE_MESSAGES.FOOD_STYLE_REQUIRED,
    }),
  ),
  mealKits: z.array(
    z.object({
      mealKit: z.object({
        oldId: z.string().optional(),
        serving: z.number().min(1),
        price: z.number().min(1),
      }),
      extraSpice: z.object({
        oldId: z.string().optional(),
        imageName: z.string().min(1),
        name: z.string().min(1),
        price: z.number().min(1),
        image: z.instanceof(File),
      }),
    }),
  ),
  deletedMealKits: z.array(z.string()),
});
