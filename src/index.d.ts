/**
 * This determines the rounding mode. I only documented three rounding modes but there are others undocumented if you need it.
 */
declare interface RoundingMode {
	CEILING: 0;
	FLOOR: 1;

	/**
	 * Round the value towards zero (truncates the value). (default for compact and scientific/engineering notation)
	 */
	DOWN: 2;
	UP: 3;

	/**
	 * Round it to the nearest even if it's in the midpoint, round it up if it's above the midpoint and down otherwise. (default unless it's compact or scientific/engineering notation)
	 */
	HALF_EVEN: 4;
	HALF_DOWN: 5;

	/**
	 * Round it away from zero if it's in the midpoint or above, down otherwise. (most familiar, this is probably the method you are taught at school)
	 */
	HALF_UP: 6;
}

/**
 * This determines how the grouping separator (comma by default) is inserted - integer part only. There are three options.
 */
declare interface GroupingStrategy {
	/**
	 * no grouping.
	 */
	OFF: 0;

	/**
	 * grouping only on 5 digits or above. (default for compact notation - for compatibility reasons)
	 */
	MIN2: 1;

	/**
	 * always group the value. (default unless it's compact notation)
	 */
	ON_ALIGNED: 3;
}

declare interface ENumberFormatSymbols {
	kDecimalSeparatorSymbol: 0;
	kGroupingSeparatorSymbol: 1;
	kMinusSignSymbol: 6;
	kPlusSignSymbol: 7;
	kExponentialSymbol: 11;
	kInfinitySymbol: 14;
	kNaNSymbol: 15;
}

/**
 * This determines how you display the plus sign (`+`) and the minus sign (`-`):
 */
declare interface SignDisplay {
	/**
	 * Displays the minus sign only if the value is negative (that includes -0 and -NaN). (default)
	 */
	AUTO: 0;

	/**
	 * Displays the plus/minus sign on all values.
	 */
	ALWAYS: 1;

	/**
	 * Don't display the plus/minus sign.
	 */
	NEVER: 2;

	/**
	 * Display the plus/minus sign on all values except zero, numbers that round to zero and NaN.
	 */
	EXCEPT_ZERO: 5;

	/**
	 * Display the minus sign only if the value is negative but do not display the minus sign on -0 and -NaN.
	 */
	NEGATIVE: 7;
}

/**
 * This determines how the decimal separator (`.` by default) is displayed.
 */
declare interface DecimalSeparatorDisplay {
	/**
	 * only show the decimal separators if there are at least one digits after it (default)
	 */
	AUTO: 1;

	/**
	 * always display the decimal separator, even if there's no digits after it
	 */
	ALWAYS: 1;
}

declare interface RoundingPriority {
	RELAXED: 0;
	STRICT: 1;
}

type ValidRoundingMode = RoundingMode[keyof RoundingMode];
type ValidGroupingStrategy = GroupingStrategy[keyof GroupingStrategy];
type ValidENumberFormatSymbols = ENumberFormatSymbols[keyof ENumberFormatSymbols];
type ValidSignDisplay = SignDisplay[keyof SignDisplay];
type ValidDecimalSeparatorDisplay = DecimalSeparatorDisplay[keyof DecimalSeparatorDisplay];
type ValidRoundingPriority = RoundingPriority[keyof RoundingPriority];

declare class DecimalFormatSymbols {
	public GetSymbol(symbol: ValidENumberFormatSymbols): string;
	public SetSymbol(symbol: ValidENumberFormatSymbols, value: string): void;
}

declare interface DecimalFormatSymbolsStatic {
	readonly CreateWithLastResortData: () => DecimalFormatSymbols;
}

declare class IntegerWidth {
	/**
	 * Truncates the integer part of the number to certain digits.
	 * @param maxInt
	 */
	public TruncateAt(maxInt: number): IntegerWidth;
}

declare interface IntegerWidthStatic {
	/**
	 * Zero fill numbers at the integer part of the number to guarantee at least certain digit in the integer part of the number.
	 * @param minInt
	 */
	readonly ZeroFillTo: (minInt: number) => IntegerWidth;
}

/**
 * ScientificNotation is a subclass of `Notation`.
 */
declare class ScientificNotation extends Notation {
	/**
	 * The minimum, padding with zeroes if necessary.
	 * @param minExponentDigits
	 */
	public WithMinExponentDigits(minExponentDigits: number): ScientificNotation;

	/**
	 * See SignDisplay enum.
	 * @param exponentSignDisplay
	 */
	public WithExponentSignDisplay(exponentSignDisplay: ValidSignDisplay): ScientificNotation;
}

/**
 * No methods currently but this is created just in case. This is a subclass of `Notation`.
 */
declare class CompactNotation extends Notation {}

/**
 * No methods currently but this is created just in case. This is a subclass of `Notation`.
 */
declare class SimpleNotation extends Notation {}

declare class Notation {}

declare interface NotationStatic {
	/**
	 * Scientific notation and the engineering version of it respectively. Uses E as the exponent separator but you can change this through the Symbols settings.
	 */
	readonly Engineering: () => ScientificNotation;

	/**
	 * Scientific notation and the engineering version of it respectively. Uses E as the exponent separator but you can change this through the Symbols settings.
	 */
	readonly Scientific: () => ScientificNotation;

	/**
	 * Basically abbreviations with suffix appended, scaling by every thousands as the suffix changes.
	 * The suffixTable argument does not respect the __index metamethod nor the __len metamethod.
	 */
	readonly CompactWithSuffixThousands: (suffixes: Array<string>) => CompactNotation;

	/**
	 * The standard formatting without any scaling. The default.
	 */
	readonly Simple: () => SimpleNotation;
}

/**
 * FractionPrecision is subclass of `Precision` with more options for the fractional (decimal) digits precision. Calling these methods is not required.
 */
declare class FractionPrecision extends Precision {
	/**
	 * Round to the decimal places specified by the `FractionPrecision` object but keep at least the amount of significant digit specified by the argument.
	 * @param minSignificantDigits
	 */
	public WithMinDigits(minSignificantDigits: number): this;

	/**
	 * Round to the decimal places specified by the `FractionPrecision` object but don't keep any more the amount of significant digit specified by the argument.
	 * @param maxSignificantDigits
	 */
	public WithMaxDigits(maxSignificantDigits: number): this;

	public WithSignificantDigits(
		minSignificantDigits: number,
		maxSignificantDigits: number,
		roundingPriority: ValidRoundingPriority,
	): this;
}

/**
 * No methods currently but this is created just in case. This is a subclass of `Precision`.
 */
declare class SignificantDigitsPrecision extends Precision {}
declare class Precision {}

/**
 * These are precision settings and changes to what places/figures the number rounds to, located in FormatNumber.Precision. The default is `Precision.Integer().WithMinDigits(2)` for abbreviations and `Precision.MaxFraction(6)` otherwise (for compatibility reasons).
 */
declare interface PrecisionStatic {
	/**
	 * Rounds the number to the nearest integer
	 */
	readonly Integer: () => FractionPrecision;

	readonly Unlimited: () => Precision;

	/**
	 * Rounds the number to a certain fractional digits (or decimal places), min is the minimum fractional (decimal) digits to show, max is the fractional digits (decimal places) to round, fixed refers to both min and max.
	 * @param minMaxFractionPlaces
	 */
	readonly FixedFraction: (minMaxFractionPlaces: number) => FractionPrecision;

	/**
	 * Rounds the number to a certain fractional digits (or decimal places), min is the minimum fractional (decimal) digits to show, max is the fractional digits (decimal places) to round, fixed refers to both min and max.
	 * @param minFractionPlaces
	 */
	readonly MinFraction: (minFractionPlaces: number) => FractionPrecision;

	/**
	 * Rounds the number to a certain fractional digits (or decimal places), min is the minimum fractional (decimal) digits to show, max is the fractional digits (decimal places) to round, fixed refers to both min and max.
	 * @param maxFractionPlaces
	 */
	readonly MaxFraction: (maxFractionPlaces: number) => FractionPrecision;

	/**
	 * Rounds the number to a certain fractional digits (or decimal places), min is the minimum fractional (decimal) digits to show, max is the fractional digits (decimal places) to round, fixed refers to both min and max.
	 * @param minFractionPlaces
	 * @param maxFractionPlaces
	 */
	readonly MinMaxFraction: (minFractionPlaces: number, maxFractionPlaces: number) => FractionPrecision;

	/**
	 * Round the number to a certain significant digits; min, max, and fixed are specified above but with significant digits.
	 * @param minMaxSignificantDigits
	 */
	readonly FixedSignificantDigits: (minMaxSignificantDigits: number) => SignificantDigitsPrecision;

	/**
	 * Round the number to a certain significant digits; min, max, and fixed are specified above but with significant digits.
	 * @param minSignificantDigits
	 */
	readonly MinSignificantDigits: (minSignificantDigits: number) => SignificantDigitsPrecision;

	/**
	 * Round the number to a certain significant digits; min, max, and fixed are specified above but with significant digits.
	 * @param maxSignificantDigits
	 */
	readonly MaxSignificantDigits: (maxSignificantDigits: number) => SignificantDigitsPrecision;

	/**
	 * Round the number to a certain significant digits; min, max, and fixed are specified above but with significant digits.
	 * @param minSignificantDigits
	 * @param maxSignificantDigits
	 */
	readonly MinMaxSignificantDigits: (
		minSignificantDigits: number,
		maxSignificantDigits: number,
	) => SignificantDigitsPrecision;
}

/**
 * The class to format the numbers.
 */
declare class NumberFormatter {
	/**
	 * The number to format, it could be any Luau number. It accounts for negative numbers, infinities, and NaNs. It returns `string` instead of `FormattedNumber` to simplify the implementation of module.
	 * @param value The value you are formatting.
	 */
	public Format(value: number): string;

	/**
	 * Tries to convert it to skeleton. If it is unable to (like the settings having compact notation or symbols) then the first value will return false and a message stating that it is unsupported.
	 * If it's successful then the first value will return true and the second value will return the skeleton.
	 */
	public ToSkeleton(): LuaTuple<[success: boolean, value: string]>;

	/**
	 * See Notation.
	 * @param notation
	 */
	public Notation(notation: Notation): NumberFormatter;
	public Precision(precision: Precision): NumberFormatter;
	public RoundingMode(roundingMode: ValidRoundingMode): NumberFormatter;
	public Grouping(strategy: ValidGroupingStrategy): NumberFormatter;
	public IntegerWidth(style: IntegerWidth): NumberFormatter;
	public DecimalFormatSymbols(symbols: DecimalFormatSymbols): NumberFormatter;
	public Sign(style: ValidSignDisplay): NumberFormatter;
	public Decimal(style: ValidDecimalSeparatorDisplay): NumberFormatter;
}

interface NumberFormatterStatic {
	/**
	 * Creates a new number formatter with the default setting.
	 */
	readonly With: () => NumberFormatter;

	/**
	 * Tries to create a new number formatter with the skeleton string provided. If unsuccessful (e.g. the skeleton syntax is invalid) then it returns false and a message string, otherwise it returns true and the NumberFormatter.
	 * See the Number Skeletons section of this API documentation for the skeleton syntax.
	 *
	 * @see https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#skeleton-stems-and-options
	 * @param skeleton
	 */
	readonly ForSkeleton: (
		skeleton: string,
	) => LuaTuple<[success: true, formatter: NumberFormatter] | [success: false, error: string]>;
}

interface Main {
	NumberFormatter: Readonly<NumberFormatterStatic>;
	Notation: Readonly<NotationStatic>;
	Precision: Readonly<PrecisionStatic>;

	RoundingPriority: Readonly<RoundingPriority>;
	RoundingMode: Readonly<RoundingMode>;
	GroupingStrategy: GroupingStrategy;
	IntegerWidth: Readonly<IntegerWidthStatic>;
	DecimalFormatSymbols: Readonly<DecimalFormatSymbolsStatic>;
	ENumberFormatSymbols: Readonly<ENumberFormatSymbols>;
	SignDisplay: Readonly<SignDisplay>;
	DecimalSeparatorDisplay: Readonly<DecimalSeparatorDisplay>;
}

interface Simple {
	/**
	 * Formats a number with the skeleton settings if provided.
	 * @param value
	 * @param skeleton
	 * @returns
	 */
	Format: (value: number, skeleton?: string) => string;

	/**
	 * Formats a number in compact notation.
	 * You'll need to provide the suffixes in the Simple ModuleScript. Multiple instances of suffixes are not supported
	 * See the Number Skeletons section of this API documentation for the full skeleton syntax, but here's the several skeleton syntax for quick reference if you want to change precision (e.g. decimal places)
	 * @param value
	 * @param skeleton
	 * @returns
	 */
	FormatCompact: (value: number, skeleton?: string) => string;
}

interface FormatNumber {
	FormatNumber: Readonly<Main>;
	Main: Readonly<Main>;
	Simple: Readonly<Simple>;
}

declare const FormatNumber: Readonly<FormatNumber>;
export = FormatNumber;
