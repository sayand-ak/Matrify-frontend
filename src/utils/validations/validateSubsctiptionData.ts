import * as Yup from "yup";

export const validationSchema = Yup.object({
    weekly: Yup.number()
        .min(1, 'Weekly amount must be at least 1')
        .required('Weekly amount is required')
        .test('is-less-than-monthly', 'Weekly amount must be less than monthly amount', function (value) {
            return value < this.parent.monthly;
        })
        .test('is-less-than-yearly', 'Weekly amount must be less than yearly amount', function (value) {
            return value < this.parent.yearly;
        }),
    monthly: Yup.number()
        .min(1, 'Monthly amount must be at least 1')
        .required('Monthly amount is required')
        .test('is-less-than-yearly', 'Monthly amount must be less than yearly amount', function (value) {
            return value < this.parent.yearly;
        }),
    yearly: Yup.number()
        .min(1, 'Yearly amount must be at least 1')
        .required('Yearly amount is required'),
});


export const validateSubscriptionOfferData = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title cannot be longer than 100 characters'),
        
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long')
        .max(500, 'Description cannot be longer than 500 characters'),
        
    offerPercentage: Yup.number()
        .min(1, 'Offer percentage must be at least 1%')
        .max(100, 'Offer percentage cannot be more than 100%')
        .required('Offer percentage is required'),

    startsAt: Yup.date()
        .required('Start date is required')
        .test('is-valid-date', 'Start date must be a valid date', value => !isNaN(new Date(value).getTime())),
        
    endsAt: Yup.date()
        .required('End date is required')
        .test('is-valid-date', 'End date must be a valid date', value => !isNaN(new Date(value).getTime()))
        .min(Yup.ref('startsAt'), 'End date cannot be before the start date')
});