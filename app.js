new Vue({
    el: '#app',

    data: {
        currencies: {},
        from: 'USD',
        to: 'ARS',
        amount: 0,
        result: 0,
    },

    mounted() {
        const currencies = localStorage.getItem('currencies');

        if (currencies) {

            this.currencies = JSON.parse(currencies);
            return;
        }

        axios.get('https://free.currencyconverterapi.com/api/v6/currencies?apiKey=07cd55f13c9bd4fd5ff4')
            .then(response => {
                this.currencies = response.data.results;
                localStorage.setItem('currencies', JSON.stringify(response.data.results));
            })
            .catch(e => console.log(e));

    },

    computed: {
        formatCurrency() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (this.amount * this.result).toFixed(2);
        },
    },
    methods: {
        convertCurrency() {

            const format = this.from + '_' + this.to;

            axios.get('https://free.currencyconverterapi.com/api/v6/convert?q=' + format + '&compact=ultra&apiKey=07cd55f13c9bd4fd5ff4')
                .then(response => {
                    this.result = response.data[format];
                    console.log(format)
                });
        }
    },

    watch: {
        from() {
            this.result = 0;
        },
        to() {
            this.result = 0;
        }
    },

})