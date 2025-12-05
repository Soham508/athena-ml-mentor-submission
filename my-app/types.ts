export interface NumeralSystem {
    id: string;
    name: string;
    culture: string;
    region: string;
    period: string;
    base: number;
    description: string;
    example: string;
    exampleValue: number;
    color: string;
    characteristics: string[];
}

export interface ConversionStep {
    step: number;
    description: string;
    calculation?: string;
    result: string;
}

export interface NumeralSystemConverter {
    id: string;
    name: string;
    color: string;
    icon: string;
    toSystem: (num: number) => { result: string; steps: ConversionStep[] };
    toArabic: (str: string) => { result: number; steps: ConversionStep[] };
    validate: (str: string) => boolean;
    placeholder: string;
}