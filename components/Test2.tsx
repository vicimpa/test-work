import React, { useState, Fragment } from "react";
import { createShareStore } from "../lib/SharedStore";
import * as M from "../lib/MarineLife";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Counter } from "../lib/Counter";

interface ISave {
  className: string
  data?: boolean[]
}

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
  button: {
    margin: theme.spacing(1),
  },
  control: {
    padding: theme.spacing(2),
  },
  rightAlign: {
    '& input': {
      textAlign: 'right'
    }
  },
  root2: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export const test2state = createShareStore<ISave[]>([], 'test2-stores')

export const getDefault = () => {
  const array: M.MarineLife[] = []

  for (let d of test2state.get()) {
    const meClass = M.MarineLife.allClasses.find(e => {
      return e.className == d.className
    })

    if (!meClass) {
      array.push(new M.MarineLife(d.className, ...d.data))
      continue
    }

    array.push(new meClass())
  }

  return array
}

export const saveDefault = (state: M.MarineLife[]) => {
  const setState: ISave[] = []

  for (let d of state) {
    setState.push({
      className: d.className,
      data: [d.isCanSwim, d.isCanBite]
    })
  }

  test2state.set(setState)
}

export const Test2Component = () => {
  const [state, setState] = useState(getDefault())
  const classes = useStyles()
  const counter = new Counter()

  const add = (e: typeof M.MarineLife) => {
    setState([...state, new e])
  }

  const del = (e: M.MarineLife) => {
    setState(state.filter(ee => ee !== e))
  }

  saveDefault(state)

  return (

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={3}>
        {M.MarineLife.allClasses.map(e => {
          return (
            <Button
              key={e.name}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => add(e)}
              startIcon={<AddIcon />}
            > Add {e.className.replace('Marine', '')} </Button>
          )
        })}
      </Grid>
      <Grid item xs={8}>
        <List className={classes.root2}>
          {state.map((e, i, t) => {
            return (
              <ListItem key={`l-${counter.add(e.className)}`} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={e.display()} src={`static/fish/${e.display()}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={(
                    <Fragment>
                      {e.name}
                      <IconButton onClick={() => del(e)}><Delete /></IconButton>
                    </Fragment>
                  )}
                  secondary={(
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Class: {e.className}
                      </Typography>
                      {` — can swim: ${e.isCanSwim}, can bite: ${e.isCanBite}`}

                    </Fragment>
                  )}
                />
              </ListItem>
            )
          })}
        </List>
      </Grid>
    </Grid>
  )
}
