import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
import { Bike } from "./bike.entity";
import { MediaItem } from "./media-item.entity";
import { BikeRentalBase } from "./base.entity";
  
  @Entity("bike_media_items")
  export class BikeMediaItem extends BikeRentalBase {
    @Column({ type: "int" })
    bikeId: number;
  
    @Column({ type: "int" })
    mediaItemId: number;
  
    @ManyToOne(() => Bike, (bike) => bike.bikeMediaItems)
    bike: Bike;
  
    @ManyToOne(() => MediaItem, (mediaItem) => mediaItem.bikeMediaItems)
    @JoinColumn({ name: 'media_item_id', referencedColumnName: 'id' })
    mediaItem: MediaItem;
  }