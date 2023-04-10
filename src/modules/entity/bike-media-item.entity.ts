import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
import { Bike } from "./bike.entity";
import { MediaItem } from "./media-item.entity";
  
  @Entity("bike_media_items")
  export class BikeMediaItem {
    @Column({ type: "int" })
    bikeId: number;
  
    @Column({ type: "int" })
    mediaItemId: number;
  
    @ManyToOne(() => Bike, (bike) => bike.mediaItems)
    bike: Bike;
  
    @ManyToOne(() => MediaItem, (mediaItem) => mediaItem.bikeMediaItems)
    @JoinColumn({ name: 'media_item_id', referencedColumnName: 'id' })
    mediaItem: MediaItem;
  }