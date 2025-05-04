# Endpoints

## Client side

## Order
- id (`uuid`)
- name (`string`)
- startDate (`date`)
- endDate (`date`)
- status (`enum: active, pending, completed, expired`)
- budget (`decimal`)
- labelingLanguage (`enum: pl, en ...`)

## Dataset
- id (`uuid`)
- name (`string`)
- minSamplesCount (`number`)
- currentSamplesCount (`number`)
- imageGuidelines (`string`)
- exampleImageUrl (`string`)
- features (`Array<DatasetFeature>`)

## DatasetFeature
- id (`uuid`)
- name (`string`)
- labelGuidelines (`string`)
- exampleLabel (`string`)

## Task
- id (`uuid`)
- request (`Request`)
- 

### `GET` `/orders`

- `id` - (uuid)
- `name` - (string)
- `endDate`- (date)
- `status` - (enum: active, pending, completed, expired)
- `minSamplesCount` (number)
- `currentSamplesCount` (number)

### `GET` `/orders/:id`

- request_id (id)
- request_name (string)
- request_description (text)
- start_date (date)
- end_date (date)
- status (enum: active, pending, completed, expired)
- budget (float)
- labeling_language (enum: polish, english...)
- dataset_id
- dataset_name
- min_samples_count (number)
- current_samples_count (number)
- image_guidelines (text)
- example_image_url (text)
- features (array)
    - feature_name (string)
    - feature_description (text)
    - label_guidelines (text)
    - type (enum: text)
    - example_label

### `POST` `/orders`

Dane wysyłane po zatwierdzeniu wypełnienium formularza tworzenia requestu

- request_name (string)
- request_description (text)
- start_date (date)
- end_date (date)
- budget (float)
- labeling_language (enum: polish, english...)
- dataset_name (string)
- dataset_description (text)
- min_samples_count (number)
- image_guidelines (text)
- example_image_url (text)
- features (array)
    - feature_name (string)
    - feature_description (text)
    - type (enum: text)
    - example_label

## User

### `GET` `/orders`

- id (id)
- request_name (string)
- min_samples_count (number)
- current_samples_count (number)
- min_contributors (number)
- contributors (number)
- entry fee (number)
- end_date (date)
- reward (number)

### `GET` `/orders/:id`

- request_id (id)
- request_name (string)
- min_samples_count (number)
- current_samples_count (number)
- min_contributors (number)
- contributors (number)
- entry_fee (number)
- start_date (date)
- end_date (date)
- reward (number)
- estimated_tasks_amout (number)
- labeling_language (enum: polish, english...)
- features (array)
    - feature_name (string)

### `GET` `/tasks`

- taks_id (id)
- request_name (string)
- dataset_name (string)
- type (enum: labeling, cross_checking)
- end_date (date)

### `GET` `/tasks/label/:id`

- task_id
- dataset_name (string)
- dataset_description (text)
- image_guidlines (text)
- example_image_url (string)
- features (array)
    - labeling_guidelines (text)
    - feature_name (string)
    - feature_description (text)
    - example_label (text)

### `POST` `/tasks/label/:id`

- task_id (id)
- image_url (string)
- features:
    - feature_label (text)

### `GET` `/tasks/check/:id`

- task_id (id)
- dataset_name (string)
- dataset_description (text)
- image_url (string)
- features
    - feature_name (string)
    - feature_label (text)
    - isCorrect (bool)
