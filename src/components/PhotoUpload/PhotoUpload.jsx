import { useEffect, useMemo, useRef, useState } from 'react';

import { useField, useFormikContext } from 'formik';

import Icon from '@components/Icon/Icon';

export default function PhotoUpload({ name = 'photo', css }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileUrlRef = useRef(null);
  const inputId = useMemo(() => name, [name]);

  useEffect(() => {
    if (field.value instanceof File) {
      const url = URL.createObjectURL(field.value);
      fileUrlRef.current && URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = url;
      setPreviewUrl(url);
      return;
    }
    if (!field.value) {
      fileUrlRef.current && URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = null;
      setPreviewUrl(null);
    }
  }, [field.value]);

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    };
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
    <div className={css.photoPreviewBlock}>
      {/* hidden input */}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className={css.fileInputHidden}
        onChange={onChange}
      />

      {previewUrl ? (
        <>
          <PreviewBox css={css} src={previewUrl} />
          <label htmlFor={inputId} className={css.uploadLink}>
            Upload another photo
          </label>
          {hasError && <div className={css.error}>{meta.error}</div>}
        </>
      ) : (
        <>
          <EmptyUploadBox
            css={css}
            inputId={inputId}
            invalid={hasError}
          />
          {hasError && <div className={css.error}>{meta.error}</div>}
        </>
      )}
    </div>
  );
}

function PreviewBox({ css, src }) {
  return (
    <div className={`${css.uploadBox} ${css.hasPreview}`} aria-label="Selected photo preview">
      <img
        className={css.uploadImg}
        src={src}
        alt="Preview"
        onError={() => { }}
      />
    </div>
  );
}

function EmptyUploadBox({ css, inputId, invalid }) {
  return (
    <label
      htmlFor={inputId}
      className={`${css.uploadBox} ${invalid ? css.invalid : ''}`}
      role="button"
    >
      <span className={css.uploadInner}>
        <Icon name="camera" className={css.cameraIcon}/>
        <span className={css.uploadText}>Upload a photo</span>
      </span>
    </label>
  );
}
