import scss from '../scss/actionButton.module.scss'

import type { ActionButtonProps } from "../page.type";

export default function ActionButton({ label, onClick, color }: ActionButtonProps) {
  const style = { backgroundColor: getButtonColor(color || 'red') }
  return <button className={scss.action_button} style={style} type="button" onClick={onClick}>{label}</button>
}

function getButtonColor(color: 'red'): string {
  switch(color) {
    case 'red':
      return 'rgb(117, 0, 0)'
  }
}