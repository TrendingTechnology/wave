import React from 'react';
import { stylesheet } from 'typestyle';
import { Card, decode, F, Rec, S } from '../delta';
import { cards, Format } from '../grid';
import { ProgressBar } from './progress_bar';
import { getTheme } from '../theme';

const
  theme = getTheme(),
  css = stylesheet({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      ...theme.font.s12,
      ...theme.font.w6,
    },
    values: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      ...theme.font.s18,
      ...theme.font.w3,
    },
    value: {
    },
    aux_value: {
      color: theme.colors.text7,
    },
    caption: {
      ...theme.font.s13,
      color: theme.colors.text5,
    },
    captions: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      ...theme.font.s12,
      color: theme.colors.text7,
    },
    value_caption: {
    },
    aux_value_caption: {
    },
  })

interface Opts {
  title: S
  caption: S
  value: S
  aux_value: S
  value_caption: S
  aux_value_caption: S
  progress: F
  plot_color: S
  data: S | Rec
}

type State = Partial<Opts>

const defaults: State = {
  title: 'Untitled',
}

class View extends React.Component<Card<State>, State> {
  onChanged = () => this.setState({ ...this.props.data })
  constructor(props: Card<State>) {
    super(props)
    this.state = { ...props.data }
    props.changed.on(this.onChanged)
  }
  render() {
    const
      s = theme.merge(defaults, this.state),
      data = decode(s.data)

    return (
      <div className={css.card}>
        <div className={css.title}>
          <Format data={data} format={s.title} />
        </div>
        <div className={css.caption}>
          <Format data={data} format={s.caption} />
        </div>
        <div>
          <div className={css.values}>
            <div className={css.value}>
              <Format data={data} format={s.value} />
            </div>
            <div className={css.aux_value}>
              <Format data={data} format={s.aux_value} />
            </div>
          </div>
          <ProgressBar thickness={2} color={s.plot_color} value={s.progress} />
          <div className={css.captions}>
            <div className={css.value_caption}>
              <Format data={data} format={s.value_caption} />
            </div>
            <div className={css.aux_value_caption}>
              <Format data={data} format={s.aux_value_caption} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

cards.register('card9', View)
