import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { bin2dec, BinFormats } from "../lib/Bin2Dec";
import { firstUpper } from "../lib/FirstUpper";

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

export const Test1Component = () => {
  const classes = useStyles();
  const [input, setInput] = useState('0')
  const [format, setFormat] = useState(BinFormats.INT8)
  const formats = Object.keys(BinFormats)
    .map(e => +e).filter(e => !isNaN(e))
    .map(e => ({id: e, name: BinFormats[e]}))

  const onChangeInput = ({ target: { value = '' } }) => {
    let length = +BinFormats[format].replace(/[^\d]+/g, '')
    value = value.replace(/[^01]+/g, '') || '0'
    setInput(value.substr(-length))
  }

  const onChangeFormat = ({target: {value = BinFormats.INT8}}) => {
    setFormat(+value)
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
        <TextField
          onChange={onChangeInput}
          className={classes.rightAlign + ' ' + classes.formControl}
          label="Input Data" value={input} />


        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select">Format</InputLabel>
          <Select onChange={onChangeFormat as any} value={format} native>
            {formats.map(({id, name}) => {
              name = firstUpper(name.replace(/(\d+)/, ' $1'))
              return (
                <option key={id} value={id}>{name}</option>
              )
            })}
          </Select>
        </FormControl>
        <hr />
        <p>Output: <b>{bin2dec(input, format)}</b></p>
      </Grid>
      <Grid item xs={8}>
      </Grid>
    </Grid>
  )
}