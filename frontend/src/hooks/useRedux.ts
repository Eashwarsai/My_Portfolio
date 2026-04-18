/*
 * Typed Redux Hooks
 *
 * WHAT: Pre-typed versions of useSelector and useDispatch.
 * WHY:  Without these, you'd need to type `useSelector<RootState>` and
 *       `useDispatch<AppDispatch>` every single time. These wrappers
 *       bake in the types so you just use `useAppSelector` and `useAppDispatch`.
 * HOW:  TypeScript generics + React-Redux's typed hook creators.
 *       Import these instead of the raw react-redux hooks.
 */

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

// Use throughout the app instead of plain useDispatch and useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
