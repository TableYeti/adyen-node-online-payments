/**
 * YetipayPaymentsApi - Shared utility class for interacting with Yetipay Payments API
 */
class YetipayPaymentsApi {
    constructor(apiBaseUrl, apiKey) {
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;
    }

    /**
     * Get common headers for all API requests
     */
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }

    /**
     * Create a payment session
     * @param {Object} sessionData - Session data including amount, returnUrl, reference, merchantAccount, countryCode
     * @returns {Promise<Object>} Session response
     */
    async sessions(sessionData) {
        const response = await fetch(`${this.apiBaseUrl}/sessions`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(sessionData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }

    /**
     * Get available payment methods
     * @param {Object} paymentMethodsData - Payment methods request data including merchantAccount, countryCode, amount
     * @returns {Promise<Object>} Payment methods response
     */
    async paymentMethods(paymentMethodsData) {
        const response = await fetch(`${this.apiBaseUrl}/paymentMethods`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(paymentMethodsData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }

    /**
     * Make a payment
     * @param {Object} paymentData - Payment data including payment details, countryCode, merchantAccount, returnUrl, reference, amount
     * @returns {Promise<Object>} Payment response
     */
    async payments(paymentData) {
        const response = await fetch(`${this.apiBaseUrl}/payments`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }

    /**
     * Submit additional payment details (e.g., for 3DS authentication)
     * @param {Object} details - Additional details for the payment
     * @returns {Promise<Object>} Payment details response
     */
    async paymentsDetails(details) {
        const response = await fetch(`${this.apiBaseUrl}/payments/details`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(details)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }
}

module.exports = YetipayPaymentsApi;

