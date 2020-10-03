import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { bin2dec, BinFormats } from "../lib/Bin2Dec";
import { firstUpper } from "../lib/FirstUpper";
import { createShareStore } from "../lib/SharedStore";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    flexGrow: 1,
    height: '100%'
  },
  paper: {
    flexGrow: 1,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  rightAlign: {
    '& input': {
      textAlign: 'right'
    }
  }
}));

export const test1State = createShareStore({
  input: '0',
  format: BinFormats.INT8
}, 'test1-store')

export const Test1Component = () => {
  const classes = useStyles();
  const [state, setState] = test1State.useState()
  const { input, format } = state

  const formats = Object.keys(BinFormats)
    .map(e => +e).filter(e => !isNaN(e))
    .map(e => ({ id: e, name: BinFormats[e] }))

  const onChangeInput = ({ target: { value = '' } }) => {
    let length = +BinFormats[format].replace(/[^\d]+/g, '')
    value = value.replace(/[^01]+/g, '') || '0'
    setState({ ...state, input: value.substr(-length) })
  }

  const onChangeFormat = ({ target: { value = BinFormats.INT8 } }) => {
    setState({ ...state, format: +value })
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={6}>
        <TextField
          style={{minWidth: 300}}
          onChange={onChangeInput}
          className={classes.rightAlign + ' ' + classes.formControl}
          label="Input Data" value={input} />


        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select">Format</InputLabel>
          <Select onChange={onChangeFormat as any} value={format} native>
            {formats.map(({ id, name }) => {
              name = firstUpper(name.replace(/(\d+)/, ' $1'))
              return (
                <option key={id} value={id}>{name}</option>
              )
            })}
          </Select>
        </FormControl>
        <hr />
        <h3>
          Output: 
          <b style={{color: 'red'}}>
            {' ' + bin2dec(input, format)}
          </b>
        </h3>
      </Grid>
    </Grid>
  )
}