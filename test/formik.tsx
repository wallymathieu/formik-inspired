import {
  FormikReimaginedValues,
  FormikReimaginedHelpers,
  FormikReimaginedHandlers,
  FormikReimaginedState,
  FormikReimaginedProps,
  FormikReimaginedCallbacks,
} from '../src';
import React from 'react';
import isFunction from 'lodash.isfunction';

/** @private Does a React component have exactly 0 children? */
const isEmptyChildren = (children: any): boolean =>
  React.Children.count(children) === 0;

export function FormikTestComponent<
  Values extends FormikReimaginedValues = FormikReimaginedValues
>(props: FormikReimaginedProps<Values> & FormikReimaginedCallbacks<Values>) {
  const { component, children, ...oprops } = props as any;

  const injectedformikProps: FormikReimaginedHelpers &
    FormikReimaginedHandlers &
    FormikReimaginedState<Values> = {
    setFieldValue: props.setFieldValue,
    handleChange: props.handleChange,
    handleSubmit: props.handleSubmit,
    setTouched: props.setTouched,
    values: props.values,
    errors: props.errors,
    touched: props.touched,
  };
  const formikbag = { ...oprops, ...injectedformikProps };
  return component
    ? React.createElement(component as any, formikbag)
    : children // children come last, always called
    ? isFunction(children)
      ? (children as (bag: any) => React.ReactNode)(formikbag)
      : !isEmptyChildren(children)
      ? React.Children.only(children)
      : null
    : null;
}
