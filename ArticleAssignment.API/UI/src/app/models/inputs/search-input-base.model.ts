import { DateInterval } from './date-interval.model';

export class SearchInputBase {

    public Id: number;
    public MasterId: number;
    public LeftMasterId: number;
    public RightMasterId: number;
    public CreateDateInterval?: DateInterval;
    public UpdateDateInterval?: DateInterval;
    public QueryText: string;
}