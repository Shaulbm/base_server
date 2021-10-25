export class Utils {
    static getSupportedPlatforms(): string[] {
        return ['firetv', 'osprey', 'stb', 'pesat', 'tvos', 'appletv', 'androidtv', 'pesat', 'roku'];
    }

    static toBoolean(value: any) {
        switch (value) {
            case true:
            case 'true':
            case 1:
            case '1':
            case 'on':
            case 'yes':
                return true;
            default:
                return false;
        }
    }
}
