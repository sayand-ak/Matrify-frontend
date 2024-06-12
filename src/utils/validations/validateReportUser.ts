// validationSchema.ts
import * as Yup from 'yup';

export const reportUserValidationSchema = Yup.object().shape({
    reason: Yup.string().required('Reason is required'),
    narrative: Yup.string().required('Narrative is required'),
    screenshot: Yup.mixed().required('Screenshot is required'),
    preferredAction: Yup.string().oneOf(['block', 'ban'], 'Invalid action').required('Preferred action is required'),
});
