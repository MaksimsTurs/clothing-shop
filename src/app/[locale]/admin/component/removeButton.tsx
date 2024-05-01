import scss from '../scss/removeButton.module.scss'

import type { RemoveButtonProps } from "../page.type";
import type { AppDispatch } from '@/store/store';

import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import removeItem from '@/store/admin/action/removeItem';

export default function RemoveButton({ from, id }: RemoveButtonProps) {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const removeFrom = async() => {
    await dispatch(removeItem({ from, id: id! }))
    router.back()
  }

  return <button onClick={removeFrom} className={scss.product_remove_button}><Trash2 /></button>
}