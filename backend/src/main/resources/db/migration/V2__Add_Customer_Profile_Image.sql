ALTER TABLE customer
ADD COLUMN profile_image_id VARCHAR(36);

ALTER TABLE customer
ADD CONSTRAINT unique_profile_image_id UNIQUE (profile_image_id);