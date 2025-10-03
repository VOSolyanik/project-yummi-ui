import { useEffect, useMemo, useRef, useState } from 'react';

import { useField, useFormikContext } from 'formik';

import styles from './PhotoUpload.module.css';

import Icon from '@components/Icon/Icon';

export default function PhotoUpload({ name = 'photo' }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileUrlRef = useRef(null);
  const inputId = useMemo(() => name, [name]);

  useEffect(() => {
    if (field.value instanceof File) {
      const url = URL.createObjectURL(field.value);
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = url;
      setPreviewUrl(url);
      return;
    }
    if (!field.value) {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = null;
      setPreviewUrl(null);
    }
  }, [field.value]);

  useEffect(() => () => {
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
  }, []);

  const onChange = (e) => {
    const file = e.currentTarget.files?.[0] || null;
    setFieldValue(name, file);
    if (file) {
      const url = URL.createObjectURL(file);
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = url;
      setPreviewUrl(url);
    } else {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = null;
      setPreviewUrl(null);
    }
  };

  const hasError = meta.touched && !!meta.error;

  return (
    <div className={styles.photoPreviewBlock}>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className={styles.fileInputHidden}
        onChange={onChange}
      />

      {previewUrl ? (
        <>
          <PreviewBox src={previewUrl} />
          <label htmlFor={inputId} className={styles.uploadLink}>
            Upload another photo
          </label>
          {hasError && <div className={styles.error}>{meta.error}</div>}
        </>
      ) : (
        <>
          <EmptyUploadBox inputId={inputId} invalid={hasError} />
          {hasError && <div className={styles.error}>{meta.error}</div>}
        </>
      )}
    </div>
  );
}

function PreviewBox({ src }) {
  return (
    <div className={`${styles.uploadBox} ${styles.hasPreview}`} aria-label="Selected photo preview">
      <img
        className={styles.uploadImg}
        src={src}
        alt="Preview"
        onError={() => {}}
      />
    </div>
  );
}

function EmptyUploadBox({ inputId, invalid }) {
  return (
    <label
      htmlFor={inputId}
      className={`${styles.uploadBox} ${invalid ? styles.invalid : ''}`}
    >
      <span className={styles.uploadInner}>
        <Icon name="camera" className={styles.cameraIcon} />
        <span className={styles.uploadText}>Upload a photo</span>
      </span>
    </label>
  );
}
