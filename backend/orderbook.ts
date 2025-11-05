import { generateId } from "./utils";

interface OrderType {
  orderId: string;
  type: "ask" | "bid";
  shares: "yes" | "no";
  price: number;
  volume: number;
  dateTime: string;
}
class OrderBook {
  private yesAsks: OrderType[] = [];
  private yesBids: OrderType[] = [];
  private noAsks: OrderType[] = [];
  private noBids: OrderType[] = [];

  private orderMap: Map<string, OrderType> = new Map();

  // create new order price between 0 and 1 and how much volume
  createOrder(
    type: "ask" | "bid",
    shares: "yes" | "no",
    price: number,
    volume: number
  ) {
    // do validations for price and volume
    const order: OrderType = {
      orderId: generateId(),
      dateTime: new Date().toString(),
      price,
      shares,
      type,
      volume,
    };

    if (shares === "yes") {
      if (type === "ask") {
        this.yesAsks.push(order);
      } else {
        this.yesBids.push(order);
      }
    } else {
      if (type === "ask") {
        this.noAsks.push(order);
      } else {
        this.noBids.push(order);
      }
    }

    this.orderMap.set(order.orderId, order);
  }
  matchOrder(order: OrderType) {
    let book: OrderType[];
    if (order.type === "ask") {
    } else {
    }
  }
  sortBook(book: OrderType[], type: "ask" | "bid") {
    book.sort((a, b) => {
      const priceDiff = type === "bid" ? b.price - a.price : a.price - b.price;
      if (priceDiff === 0) {
        return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      }
      return priceDiff;
    });
  }
}
