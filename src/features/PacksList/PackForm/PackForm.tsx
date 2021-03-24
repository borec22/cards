import {Button, FormControl, FormGroup, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {AddOrEditPackSchema} from '../../../utils/validators';
import {useDispatch} from 'react-redux';
import {AddOrEditPackDataType, PackType} from '../../../api/api';

type PropsType = {
   recordForEdit: AddOrEditPackDataType | null
   addOrEdit: (packData: AddOrEditPackDataType) => void
}

export const PackForm: React.FC<PropsType> = (props) => {
   const {recordForEdit, addOrEdit} = props;
   const [initialValues, setInitialValues] = useState<AddOrEditPackDataType>(recordForEdit? recordForEdit : {name: ''});
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: AddOrEditPackSchema,
      onSubmit: async (values, {setSubmitting}) => {
         addOrEdit(values);
         setSubmitting(false);
      },
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <FormControl style={{width: '300px'}}>
            <FormGroup>
               <TextField
                  label="Name"
                  margin="normal"
                  color='secondary'
                  {...formik.getFieldProps('name')}
               />
               {formik.touched && formik.errors.name && <div style={{color: 'red'}}>{formik.errors.name}</div>}


               <Button type={'submit'}
                       variant={'contained'}
                       color={'secondary'}
                       style={{marginTop: '20px'}}
                       disabled={!formik.isValid || formik.isSubmitting}>
                  Submit
               </Button>
            </FormGroup>
         </FormControl>
      </form>
   );
}