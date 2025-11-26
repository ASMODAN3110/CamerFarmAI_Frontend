import { useState, type FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal/Modal';
import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './CreatePlantationModal.module.css';

interface CreatePlantationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    area: string;
    location: string;
  }) => void;
}

export function CreatePlantationModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePlantationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('plantations.createModal.errors.nameRequired');
    }

    if (!formData.area.trim()) {
      newErrors.area = t('plantations.createModal.errors.areaRequired');
    } else if (isNaN(Number(formData.area)) || Number(formData.area) <= 0) {
      newErrors.area = t('plantations.createModal.errors.areaInvalid');
    }

    if (!formData.location.trim()) {
      newErrors.location = t('plantations.createModal.errors.locationRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      // Reset form and close modal on success
      setFormData({ name: '', area: '', location: '' });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating plantation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', area: '', location: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={t('plantations.createModal.title')}
      size="md"
    >
      <form onSubmit={handleSubmit} className={styles.createPlantationModal__form}>
        <FormField
          label={t('plantations.createModal.nameLabel')}
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={t('plantations.createModal.namePlaceholder')}
          error={errors.name}
          required
        />

        <FormField
          label={t('plantations.createModal.areaLabel')}
          type="text"
          value={formData.area}
          onChange={(e) => handleChange('area', e.target.value)}
          placeholder={t('plantations.createModal.areaPlaceholder')}
          error={errors.area}
          required
        />

        <FormField
          label={t('plantations.createModal.locationLabel')}
          type="text"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder={t('plantations.createModal.locationPlaceholder')}
          error={errors.location}
          required
        />

        <div className={styles.createPlantationModal__actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            className={styles.createPlantationModal__cancelButton}
          >
            {t('plantations.createModal.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className={styles.createPlantationModal__submitButton}
          >
            {isSubmitting
              ? t('plantations.createModal.submitting')
              : t('plantations.createModal.next')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

