import crypto from 'crypto';

export function validateTelegramSignature(initData: string, botTokenEnv: string) {
    const botToken = botTokenEnv.trim();
    const params = new URLSearchParams(initData.trim());

    const hash = params.get('hash');
    const signature = params.get('signature');

    const tuples = Array.from(params.entries())
        .filter(([key]) => key !== 'hash' && key !== 'signature')
        .map(([key, value]) => `${key}=${value}`)
        .sort();

    const dataCheckString = tuples.join('\n');

    if (hash) {
        const secret = crypto.createHash('sha256').update(botToken).digest();
        const expected = crypto.createHmac('sha256', secret).update(dataCheckString).digest();

        if (!crypto.timingSafeEqual(Buffer.from(hash, 'hex'), expected)) {
            throw new Error('Invalid Telegram hash');
        }
        return;
    }

    if (signature) {
        const webAppSecret = crypto
            .createHash('sha256')
            .update(`WebAppData${botToken}`)
            .digest();

        const expected = crypto
            .createHmac('sha256', webAppSecret)
            .update(dataCheckString)
            .digest();

        if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), expected)) {
            throw new Error('Invalid Telegram signature');
        }
        return;
    }

    throw new Error('No signature or hash found');
}
