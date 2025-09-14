import { Logger, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TechnomirPartInterface } from '../interfaces/technomir-part.interface.js';
import { TechnomirCurrencies } from '../interfaces/technomir-currencies.interface.js';
import { TechnomirBrandInterface } from '../interfaces/technomir-brands,interface.js';
import { SyncPartsService } from '../../../parts/services/sync-parts.service.js';

@Injectable()
export class TechnomirApiService {
  private readonly logger = new Logger(TechnomirApiService.name);
  private readonly BASE_API_URL: string | undefined;
  private readonly API_KEY: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly syncPartsService: SyncPartsService,
  ) {
    this.BASE_API_URL = this.config.get('TECHNOMIR_API_BASE_URL');
    this.API_KEY = this.config.get('TECHNOMIR_API_KEY');
  }

  async getStockPrice(): Promise<TechnomirPartInterface[]> {
    const url = this.BASE_API_URL + '/price/getStockPrice';
    const body = { apiToken: this.API_KEY };

    const response = await firstValueFrom(this.httpService.post(url, body));
    return response.data.data as TechnomirPartInterface[];
  }

  async getCurrencies(): Promise<TechnomirCurrencies[]> {
    const url = this.BASE_API_URL + '/info/getCurrencies';
    const body = { apiToken: this.API_KEY };

    const response = await firstValueFrom(this.httpService.post(url, body));

    return response.data.data as TechnomirCurrencies[];
  }

  async getBrands(): Promise<TechnomirBrandInterface[]> {
    const url = this.BASE_API_URL + '/info/getBrands';
    const body = { apiToken: this.API_KEY };

    const response = await firstValueFrom(this.httpService.post(url, body));

    return response.data.data as TechnomirBrandInterface[];
  }

  async syncBrands() {
    const stock = await this.getStockPrice();

    const currencies = await this.getCurrencies();

    const usdToUah =
      currencies.find((currency) => {
        return currency.currency === 'USD';
      })?.rate ?? 40;

    await this.syncPartsService.syncTechnomirParts(
      stock.slice(0, 2),
      usdToUah,
      1,
    );

    // const partManufacturerRepository = new PartManufacturerRepository(
    //   this.entityManager,
    // );

    // for (const brand of testChunk) {
    //   const brandFromDB = await partManufacturerRepository.getBrandByName(
    //     brand.brand,
    //   );

    //   if (!brandFromDB) {
    // const newBrand = new PartManufacturerEntity();
    // newBrand.name = brand.brand;
    // await this.entityManager.save(newBrand);
    //     console.log('newBrand', newBrand);
    //   } else {
    //     console.log('brandFromDB', brandFromDB);
    //   }
    // }
  }
}
