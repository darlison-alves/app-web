import { Card, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IStateList, ListComponent } from 'components/Abstract/List';
import Toolbar from 'components/Layout/Toolbar';
import TableWrapper from 'components/Shared/TableWrapper';
import { IOrder } from 'interfaces/models/order';
import { IPaginationParams } from 'interfaces/pagination';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React from 'react';
import * as RxOp from 'rxjs-operators';
import orderService from 'services/order';

interface IState extends IStateList<IOrder> {
  current?: IOrder;
  formOpened?: boolean;
}

export class OrdersList extends ListComponent<{}, IState> {
  componentDidMount() {
    this.loadData({ page: 0, pageSize: 10 });
  }

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ loading: true, error: null });
    orderService
      .list(this.mergeParams(params))
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(items => this.setPaginatedData(items), error => this.setError(error));
  };

  handleRefresh = () => this.loadData();

  render() {
    const { items, loading } = this.state;

    console.log(this.state);

    return (
      <>
        <Toolbar title='Pedidos' />

        <Card>
          {this.renderLoader()}

          <TableWrapper minWidth={500}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component='th' scope='row' align='center'>
                    Descrição
                  </TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    Quantidade
                  </TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    valor
                  </TableCell>
                  <TableCell>
                    <IconButton disabled={loading} onClick={this.handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.renderEmptyAndErrorMessages(3)}
                {items.map(order => (
                  <TableRow key={order.id}>
                    <TableCell component='th' scope='row' align='center'>
                      {order.description}
                    </TableCell>

                    <TableCell component='th' scope='row' align='center'>
                      {order.quantity}
                    </TableCell>

                    <TableCell component='th' scope='row' align='center'>
                      R$ {order.value}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
          {this.renderTablePagination()}
        </Card>
      </>
    );
  }
}
