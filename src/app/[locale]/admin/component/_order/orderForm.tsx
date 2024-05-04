import type { FormProps } from "../../page.type";
import type { AppDispatch, RootState } from "@/store/store";
import type { AdminInitState, Order, OrderStatus } from "@/store/admin/admin.type";

import FormWrapper from "@/component/form-wrapper/formWrapper";
import SelectInput from "@/component/input/select-input/selectInput";
import SmallLoader from "@/component/loader/fetch-loader/smallLoader";

import { Fragment, type SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import changeOrderStatus from "@/store/admin/action/changeOrderStatus";
import { resetLoadingState } from "@/store/user/user";

export default function OrderForm({ id }: FormProps<Order>) {
  const [selected, setSelect] = useState<OrderStatus | string>('')

  const dispatch = useDispatch<AppDispatch>()

  const { isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const orderAction = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const status = selected.split(' ')?.[1].replace('(', '').replace(')', '') as OrderStatus

    dispatch(changeOrderStatus({ id: id!, status }))
  }

  useEffect(() => {
    dispatch(resetLoadingState())
  }, [])

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper onSubmit={orderAction}>
        <SelectInput options={['Новый (SENT)', 'Отправлено (ON-MY-WAY)', 'Получено (APPEARED)']} selected={selected} setSelect={setSelect}/>
      </FormWrapper>
    </Fragment>
  )
}