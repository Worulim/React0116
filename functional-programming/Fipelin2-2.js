const orders = [
  { id: 1, customer: 'Kim', items: [{ name: 'Book', price: 15 }, { name: 'Pen', price: 3 }], status: 'completed' },
  { id: 2, customer: 'Lee', items: [{ name: 'Laptop', price: 1200 }], status: 'pending' },
  { id: 3, customer: 'Park', items: [{ name: 'Mouse', price: 25 }, { name: 'Keyboard', price: 75 }], status: 'completed' },
  { id: 4, customer: 'Kim', items: [{ name: 'Monitor', price: 300 }], status: 'completed' },
  { id: 5, customer: 'Choi', items: [{ name: 'USB', price: 10 }], status: 'cancelled' }
];

//TODO: 파이프라인 함수들 구현

// (선택) 작은 유틸들: 파이프/그룹합산
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// 1. 완료된 주문만 필터링
const completedOrders = orders.filter(o => o.status === "completed");

// 2. 각 주문의 총액 계산
const ordersWithTotal = completedOrders.map(o => ({
  ...o,
  total: o.items.reduce((sum, item) => sum + item.price, 0),
}));

// 3. 고객별 총 구매액 계산
const customerTotals = ordersWithTotal.reduce((acc, o) => {
  acc[o.customer] = (acc[o.customer] ?? 0) + o.total;
  return acc;
}, {}); // { Kim: 318, Park: 100 }

// 4. 가장 많이 구매한 고객 찾기
const topCustomer = Object.entries(customerTotals).reduce(
  (best, [customer, total]) =>
    total > best.total ? { customer, total } : best,
  { customer: null, total: -Infinity }
);

// 5. 전체 파이프라인
function getTopCustomer(orders) {
  return pipe(
    (os) => os.filter(o => o.status === "completed"),
    (os) => os.map(o => ({
      ...o,
      total: o.items.reduce((sum, item) => sum + item.price, 0),
    })),
    (os) => os.reduce((acc, o) => {
      acc[o.customer] = (acc[o.customer] ?? 0) + o.total;
      return acc;
    }, {}),
    (totals) => Object.entries(totals).reduce(
      (best, [customer, total]) =>
        total > best.total ? { customer, total } : best,
      { customer: null, total: -Infinity }
    )
  )(orders);
}

console.log(getTopCustomer(orders));
// { customer: 'Kim', total: 318 }
