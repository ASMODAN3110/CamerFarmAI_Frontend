import { useState, type FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal/Modal';
import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './CreatePlantationModal.module.css';
import formFieldStyles from '@/components/ui/FormField/FormField.module.css';

interface CreatePlantationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    area: string;
    location: string;
    cropType: string;
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
    areaUnit: 'm2',
    location: '',
    cropType: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Conversion des unités en m²
  const convertToSquareMeters = (value: number, unit: string): number => {
    const conversions: Record<string, number> = {
      m2: 1,
      ha: 10000,
      acre: 4046.86,
      km2: 1000000,
    };
    return value * (conversions[unit] || 1);
  };

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
        // Convertir la superficie en m² avant l'envoi
        const areaInSquareMeters = convertToSquareMeters(
          Number(formData.area),
          formData.areaUnit
        );
        await onSubmit({
          ...formData,
          area: areaInSquareMeters.toString(),
        });
      }
      // Reset form and close modal on success
      setFormData({
        name: '',
        area: '',
        areaUnit: 'm2',
        location: '',
        cropType: '',
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating plantation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      area: '',
      areaUnit: 'm2',
      location: '',
      cropType: '',
    });
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

        <div className={styles.createPlantationModal__areaField}>
          <label className={styles.createPlantationModal__areaLabel}>
            {t('plantations.createModal.areaLabel')}
            <span className={formFieldStyles.formField__required}> *</span>
          </label>
          <div className={styles.createPlantationModal__areaInputGroup}>
            <FormField
              type="text"
              value={formData.area}
              onChange={(e) => handleChange('area', e.target.value)}
              placeholder={t('plantations.createModal.areaPlaceholder')}
              className={styles.createPlantationModal__areaInput}
            />
            <select
              value={formData.areaUnit}
              onChange={(e) => handleChange('areaUnit', e.target.value)}
              className={styles.createPlantationModal__areaUnitSelect}
            >
              <option value="m2">{t('plantations.createModal.areaUnit.m2')}</option>
              <option value="ha">{t('plantations.createModal.areaUnit.ha')}</option>
              <option value="acre">{t('plantations.createModal.areaUnit.acre')}</option>
              <option value="km2">{t('plantations.createModal.areaUnit.km2')}</option>
            </select>
          </div>
          {errors.area && (
            <span className={styles.createPlantationModal__areaError}>{errors.area}</span>
          )}
        </div>

        <FormField
          label={t('plantations.createModal.locationLabel')}
          type="text"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder={t('plantations.createModal.locationPlaceholder')}
          error={errors.location}
          required
        />

        <FormField
          label={t('plantations.createModal.cropTypeLabel')}
          type="text"
          value={formData.cropType}
          onChange={(e) => handleChange('cropType', e.target.value)}
          placeholder={t('plantations.createModal.cropTypePlaceholder')}
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

