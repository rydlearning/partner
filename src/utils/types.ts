export interface CountryObject {
  name: string;
  iso3: string;
  iso2: string;
  states: StateProps[];
}

interface StateProps {
  name: string;
  state_code: string;
}

export interface ParentListDataProps {
  data1: string;
  data2: string;
  data3: string;
  data4: string;
  data5: string;
  data6: string;
  data7: string;
}
