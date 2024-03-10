import { Location } from "./location";

enum State
{
    open = 'open',
    pickedUp = 'picked-up',
    inTransit = 'in-transit',
    delivered = 'delivered',
    failed = 'failed',
}
export class Delivery {

    delivery_id: string;
      // user: string;
      package_id: string;
      pickup_time: Date;
      start_time: Date;
      end_time:Date;
      location:Location;
      status: State

  constructor() {
    this.delivery_id="";
    // user: string;
    this.package_id="";
    this.pickup_time=new Date();
    this.start_time=new Date();
    this.end_time= new Date();
    this.location= new Location();
    this.status= State.open
  }
}