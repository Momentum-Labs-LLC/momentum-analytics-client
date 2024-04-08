provider "aws" {
  region = local.region
}

data "aws_availability_zones" "available" {}

locals {
  env         = "prd"
  corp        = "momentum"
  iteration   = 0
  region      = "us-east-1"
  project     = "tracking"
  subproject  = "client"
  name_prefix = "${local.corp}-${local.env}-${local.project}-${local.subproject}"

  tags = {
    Production = "true"
    Project    = "${local.project}-${local.subproject}"
  }
}

################################################################################
# GitHub OIDC Role
################################################################################

module "iam_github_s3_role" {
  source = "terraform-aws-modules/iam/aws//modules/iam-github-oidc-role"

  name = "${local.name_prefix}-github-role-${local.iteration}"

  # This should be updated to suit your organization, repository, references/branches, etc.
  subjects = [
    # specific repository
    "Momentum-Labs-LLC/momentum-analytics-client:*",
  ]

  policies = {
    S3Policy = aws_iam_policy.this-s3-policy.arn
  }

  tags = local.tags
}

data "aws_s3_bucket" "this_cdn_bucket" {
  bucket = "${local.corp}-${local.env}-analytics-cdn-0"
}

resource "aws_iam_policy" "this-s3-policy" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
        ]
        Effect = "Allow"
        Resource = [
          data.aws_s3_bucket.this_cdn_bucket.arn,
          "${data.aws_s3_bucket.this_cdn_bucket.arn}/*"
        ]
      },
    ]
  })
}